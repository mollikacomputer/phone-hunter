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
                console.log(phone);
                const div = document.createElement('div');
                div.classList.add('col');
                div.innerHTML = `
                <div class="card h-100">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
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
            <h5 class="card-title">${info.data.name} </h5>
            <p class="card-text">${info.data.name} </p>
            <p class="card-text">${info.data.releaseDate} </p>
            <p class="card-text">${info.data.mainFeatures.storage} </p>
            <p class="card-text">${info.data.others.WLAN} </p>
            
        </div>
    </div>
    `;
}
