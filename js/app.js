const searchPhone=()=>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value.toLowerCase();
    searchField.value = ' ';
    // console.log(searchText);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
    .then(response=>response.json())
    .then(data=> showPhone(data.data))
}

const showPhone=(phones)=>{
    const displayPhone = document.getElementById('display-phone-id');
    displayPhone.textContent = ' ';
    phones.forEach(phone=>{
        // console.log(phone);
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
            <button id="phone-details" type="button" class="btn btn-light">Show Details</button>
            </div>
        </div>
        `;
        displayPhone.appendChild(div);
    })
}

