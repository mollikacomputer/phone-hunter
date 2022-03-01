document.getElementById('spinner').style.display='none';
const searchPhone=()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.toLowerCase();
    searchField.value = '';
    if(searchText ==''){
        document.getElementById('spinner').style.display='block';
        document.getElementById('error-message').style.display='block';
        document.getElementById('display-phone-id').textContent = '';
    }else{
    // console.log(searchText);
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response=>response.json())
    .then(data=> showPhone(data.data))
    
    }
}

const showPhone=(phones)=>{
    // console.log(phones);
    const displayPhone = document.getElementById('display-phone-id');
    displayPhone.textContent = '';
    if(phones.length===0){
        document.getElementById('spinner').style.display = 'block';
        document.getElementById('error-message').style.display = 'block';
    }else{
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('error-message').style.display = 'none';
        phones.forEach(phone=>{
                // console.log(phone);
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title"> ${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                </div>
                <div class="card-footer">
                <button onclick="phoneDetails('${phone.slug}')" type="button" class="btn btn-light bg-white">Show Details</button>
                </div>
            </div>
        `;
        displayPhone.appendChild(div);
    })
    }

}
const phoneDetails=(id)=>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    // console.log('hello bos hoise', info);
    fetch(url)
    .then(response=>response.json())
    .then(data=>showPhoneInfo(data))

}

const showPhoneInfo = (info)=>{
    document.getElementById('info-id').innerHTML = `
        <div class="card" style="width: 80%;">
            <img src="${info.data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h6 class="card-title">${info.data.name} </h6>
            <p> <b> Main Feature : </b></p>
            <p class="card-title"><b>Chip Set :</b> ${info.data.mainFeatures.chipSet} </p>
            <p class="card-title"><b>Display Size :</b> ${info.data.mainFeatures.displaySize} </p>
            <p class="card-title"><b>Memory :</b> ${info.data.mainFeatures.memory} </p>
            <p> <b>Sensor :</b> ${info.data.mainFeatures.sensors}</p>
            <p class="card-text"><b>Brand :</b> ${info.data.brand} </p>
            <p class="card-text"><b>Phone Release Date </b> 
            <span id="release-data">${info.data.releaseDate}</span> </p>
            <p class="card-text"><b>Storage : </b>${info.data.mainFeatures.storage} </p>
            <p class="card-text"> <b>Other info WLAN : </b>${info.data.others.WLAN} </p>
            
        </div>
    </div>
    `;
}
