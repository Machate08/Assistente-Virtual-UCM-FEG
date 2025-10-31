import { GoogleGenAI } from "@google/genai";
import { Faq, Category } from '../types';

const getApiKey = (): string | undefined => {
  try {
    return process.env.API_KEY; 
  } catch (e) {
    return undefined;
  }
};

const hasApiKey = (): boolean => !!getApiKey();

const fallbackResponse = (query: string, faqs: Faq[]): string => {
  const queryLower = query.toLowerCase();
  for (const faq of faqs) {
    if (faq.question.toLowerCase().includes(queryLower) || faq.answer.toLowerCase().includes(queryLower)) {
      return faq.answer;
    }
  }
  return "Desculpe, não encontrei informações específicas sobre isso na base de conhecimento. Por favor, contacte a secretaria da UCM-FEG Beira para mais informações.";
};

export const getBotResponse = async (query: string, faqs: Faq[], categories: Category[]): Promise<string> => {
  const apiKey = getApiKey();

  if (!apiKey) {
    console.log("API Key not found. Using fallback mode.");
    await new Promise(resolve => setTimeout(resolve, 500));
    return fallbackResponse(query, faqs);
  }

  const ai = new GoogleGenAI({ apiKey });

  const faqContext = faqs.map(faq => {
      const category = categories.find(c => c.id === faq.categoryId);
      return `Categoria: ${category?.name || 'Geral'}\nPergunta: ${faq.question}\nResposta: ${faq.answer}`;
  }).join('\n\n');

  const systemInstruction = `Você é um assistente virtual da Universidade Católica de Moçambique - Faculdade de Economia e Gestão (UCM-FEG) em Beira. Seu nome é Gito.

Sua função é ajudar estudantes e interessados com informações sobre:
- Matrículas e inscrições
- Propinas (valores, prazos, formas de pagamento)
- Calendário acadêmico
- Emissão de documentos e certificados
- Acesso ao e-Learning, portal do estudante e bibliotecas
- Secretaria (horários e contatos)

INSTRUÇÕES IMPORTANTES:
1. Seja sempre cordial, profissional e prestativo. Apresente-se como Gito na primeira mensagem.
2. Responda em português de Moçambique.
3. Use as informações da base de conhecimento abaixo como sua fonte primária e única de verdade. Responda APENAS com base nessas informações.
4. Se a informação não estiver na base de conhecimento, NÃO INVENTE. Responda de forma educada que não tem essa informação e sugira que o estudante contacte a secretaria da UCM-FEG para mais detalhes.
5. Mantenha respostas concisas mas completas.
6. Use formatação clara, como listas com bullets (*) ou parágrafos curtos, para facilitar a leitura.
7. Não mencione que você está a usar uma "base de conhecimento". Aja como se soubesse as informações naturalmente.

BASE DE CONHECIMENTO (FAQs):
---
${faqContext}
---
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: query }] }],
      config: {
        systemInstruction,
        temperature: 0.5,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Ocorreu um erro ao conectar com o serviço de IA. Por favor, tente novamente mais tarde. A usar o modo de fallback: " + fallbackResponse(query, faqs);
  }
};
