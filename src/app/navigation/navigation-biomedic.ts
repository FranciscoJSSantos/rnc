
export const navigationBiomedic = [
  {
    label: 'Ocorrências',
    icon: 'rule',
    items: [
      {
        label: 'Cadastrar',
        link: '/occurrences',
        icon: 'add_box'
      },
      {
        label: 'Cadastradas',
        link: '/registered-non-conformities',
        icon: 'list',
      }
    ]
  },
  {
      label: 'Análise',
      icon: 'data_saver_off',
      items: [
        {
          label: 'Gráfico',
          link: '/4lab-chart',
          icon: 'assessment',
        },
        {
          label: 'Relatório',
          link: '/4lab-report-analysis',
          icon: 'assignment',
        }
      ]},
      {
        label: 'Aprovação de Cadastro',
        icon: 'approval',
        link: '/registration-approval'
      }
  /*{
    label: 'Plano de ação',
    icon: 'input',
    items: [
      {
        label: 'Novo Plano',
        link: '/4lab-register-action-plan',
        icon: 'note_add'
      },
      {
        label: 'Cadastrados',
        link: '/4lab-action-plan',
        icon: 'format_list_numbered'
      },
    ]
  },*/
  // ,

];
