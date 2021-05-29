function prayerTimes(latitude, longitude ){
    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude +'&method=2&month=12&year=2020')
    .then(response => response.json())
    .then(function(response){
        let date        = new Date();
        let today       = date.getDate() - 1;// karena jika hari ini tgl 10 maka array  menjadi 11 karena di mulai dari 0
        // console.log(today);
        let data        = response.data[0].timings

        let app         = document.getElementById('app');
        let table       = document.createElement('table');
        let tableTbody  = document.createElement('tbody');        
        console.log(response.data[today])

        for(i in data) {
            let row         = tableTbody.insertRow();
            let name        = row.insertCell(0);
            let time        = row.insertCell(1);
            name.innerHTML  = i;
            time.innerHTML  = data[i]
            tableTbody.appendChild(row);
        }
        
        table.appendChild(tableTbody);
        app.appendChild(table);

    });
}

function success(position){
    console.log(position);
    prayerTimes(position.coords.latitude, position.coords.longitude );
}

function error(){
    // default jika tidak memberi akses location
    prayerTimes('31.771959', '35.217018');
}

function userLocation(){
    if(!navigator.geolocation){
        alert("Geolocation tidak didukung didalam browser anda, silahkan gunakan browser lain");
    } else{
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function index(){
    let app         = document.getElementById("app");
    let h3          = document.createElement("h3");
    h3.innerHTML    = "Prayer Times";

    app.appendChild(h3);

    userLocation();
}

index();