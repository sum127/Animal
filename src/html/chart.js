require.config({
    shim: {
        'chartjs': {
            deps: ['moment']    // enforce moment to be loaded before chartjs
        }
    },
    paths: {
        'chartjs': 'path/to/chartjs/dist/Chart.min.js',
        'moment': 'path/to/moment'
    }
});
