module.exports = {
    title: 'Kubernetest',
    description: 'Ce rapport présentera les travaux de recherches et de compréhension de Kubernetes.',
    themeConfig: {
        nav: [
            { text: 'Accueil', link: '/'},
            { text: 'Kubernetes', link: '/kubernetes'},
            {
                text: 'Outils',
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
                    { text: 'Simple API', link: '/tests/simple-api'},
                    { text: 'Message app', link: '/tests/message'}
                ]
            }
        ],
        sidebar: 'auto',
        smoothScroll: true
    }
}
