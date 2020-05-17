const form = document.getElementById('vote-form');

form.addEventListener('submit', (e)=>{
    const choice = document.querySelector('input[name=os]:checked').value;
    const data = { os: choice};

    fetch('/poll', {
        method: 'post',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(err => console.log(err)); 

    e.preventDefault();
});

fetch('/poll')
.then(res => res.json())
.then(data => {
    const votes = data.votes;
    const totalVotes = votes.length;
    
})

const chartContainer = document.querySelector('#chartContainer');

let dataPoints = [
    { label: 'Windows', y: 0 },
    { label: 'MacOS', y: 0 },
    { label: 'Linux', y: 0 },
    { label: 'Other', y: 0 }
];

if(chartContainer) {
    const chart = new CanvasJS.Chart('chartContainer', {
        animationEnabled: true,
        theme: 'theme1',
        title: {
            text: 'OS Restults'
        },
        data: [
            {
                type: 'column',
                dataPoints: dataPoints
            }
        ]
    })
    chart.render();

    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('39a0914e65feead5b9ed', {
    cluster: 'eu'
    });

    var channel = pusher.subscribe('os-poll');
    channel.bind('os-vote', function(data) {
    dataPoints.forEach(dp => {
        if (dp.label === data.os){
            dp.y += 1;
            chart.render()
        };
        
    })
    });
};

