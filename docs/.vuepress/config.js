module.exports = {
    title: 'Kubernetest',
    description: 'Ce rapport présentera les travaux de recherches et de compréhension de Kubernetes.',
    themeConfig: {
        nav: [
            { text: 'Accueil', link: '/'},
            { text: 'Kubernetes', link: '/kubernetes'},
            {
                text: 'Tests',
                items: [
                    { text: 'Dashboard', link: '/dashboard' },
                    { text: 'Kubeadm', link: '/kubeadm' },
                    { text: 'Minikube', link: '/minikube' },
                    { text: 'Siege', link: '/siege' },
                ]
            }
        ],
        sidebar: 'auto',
        smoothScroll: true
    }
}
