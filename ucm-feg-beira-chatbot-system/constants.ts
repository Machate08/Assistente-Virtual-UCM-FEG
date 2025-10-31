import { Faq, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Matrículas e Inscrições', description: 'Informações sobre o processo de matrículas e inscrições.' },
  { id: '2', name: 'Propinas e Pagamentos', description: 'Valores, prazos e métodos de pagamento de propinas.' },
  { id: '3', name: 'Calendário Académico', description: 'Datas importantes, feriados e eventos do ano letivo.' },
  { id: '4', name: 'Documentos e Certificados', description: 'Como solicitar declarações, certificados e outros documentos.' },
  { id: '5', name: 'Acesso a Sistemas', description: 'Ajuda com o portal do estudante, e-Learning e outras plataformas.' },
];

export const INITIAL_FAQS: Faq[] = [
  {
    id: '1',
    categoryId: '1',
    question: 'Quais são os prazos para matrículas e inscrições?',
    answer: 'Os prazos para matrículas e inscrições são normalmente anunciados no início do ano letivo, em Janeiro. Por favor, consulte o calendário acadêmico oficial no site da universidade ou no painel de avisos da secretaria para as datas exatas.',
    views: 152
  },
  {
    id: '2',
    categoryId: '2',
    question: 'Quais são os valores das propinas e como posso pagar?',
    answer: 'Os valores das propinas variam por curso. Você pode encontrar a tabela de preços na secretaria ou no portal do estudante. O pagamento pode ser feito via transferência bancária para a conta da UCM (disponível na tesouraria), depósito ou diretamente na tesouraria da faculdade.',
    views: 231
  },
  {
    id: '3',
    categoryId: '3',
    question: 'Onde posso encontrar o calendário acadêmico?',
    answer: 'O calendário acadêmico está disponível no site oficial da UCM-FEG, no portal do estudante e afixado nos murais de informação da faculdade. Ele contém todas as datas importantes, como início e fim das aulas, exames e feriados.',
    views: 98
  },
  {
    id: '4',
    categoryId: '4',
    question: 'Como faço para solicitar uma declaração ou certificado?',
    answer: 'Para solicitar qualquer documento oficial, você deve preencher um requerimento na secretaria acadêmica. O prazo de emissão e as taxas associadas podem ser consultadas no mesmo local. O tempo de espera normal é de 3-5 dias úteis.',
    views: 189
  },
  {
    id: '5',
    categoryId: '5',
    question: 'Como acesso a plataforma de e-Learning?',
    answer: 'O acesso à plataforma de e-Learning é feito através do link fornecido no site da universidade, utilizando seu número de estudante como nome de usuário e a senha definida no momento da matrícula. Se tiver problemas de acesso, contate o suporte técnico através do email suporte.feg@ucm.ac.mz.',
    views: 112
  },
  {
    id: '6',
    categoryId: '2',
    question: 'Posso pagar as propinas em prestações?',
    answer: 'Sim, a UCM-FEG oferece planos de pagamento em prestações. Para mais detalhes sobre as modalidades e para aderir a um plano, por favor, dirija-se à tesouraria da faculdade.',
    views: 76
  },
  {
    id: '7',
    categoryId: '1',
    question: 'Quais documentos são necessários para a matrícula?',
    answer: 'Para a matrícula de novos ingressos, são necessários: cópia do BI, certificado de habilitações, 2 fotos tipo passe, e o comprovativo de pagamento da taxa de matrícula. Para estudantes antigos, apenas o comprovativo de pagamento é necessário.',
    views: 205
  },
];
