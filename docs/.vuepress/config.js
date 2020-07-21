module.exports = {
    title: 'Kubernetest',
    description: 'Ce rapport présentera les travaux de recherches et de compréhension de Kubernetes.',
    themeConfig: {
        nav: [
            { text: 'Accueil', link: '/'},
            { text: 'Kubernetes', link: '/kubernetes'},
            {
                text: 'Tools',
                items: [
                    { text: 'Dashboard', link: '/tools/dashboard' },
                    { text: 'Kubeadm', link: '/tools/kubeadm' },
                    { text: 'Minikube', link: '/tools/minikube' },
                    { text: 'Siege', link: '/tools/siege' },
                ]
            },
            {
                text: 'Tests',
                items: [
                    { text: 'Message app', link: '/tests/message'},
                    { text: 'Simple API', link: '/tests/simple-api'}
                ]
            }
        ],
        sidebar: 'auto',
        smoothScroll: true
    }
}
