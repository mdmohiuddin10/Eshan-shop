const loadPhone = async (searchText=13, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll)
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones)

    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = '';


    // display show all button if there are more than 12 phones
    const showAllButton = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllButton.classList.remove('hidden')
    }else{
        showAllButton.classList.add('hidden')
    }

    // display only first 12 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0, 12)
    }



    phones.forEach(phone =>{
        // console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-base-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
            <button onclick="handkeShowDetaile('${phones.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)
    });
}


// 
const handkeShowDetaile = async (id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089`)
    const data = await res.json();
    const phone = data.data

    showPhoneDetails(phone)
}



const showPhoneDetails = (phone) => {
    console.log(phone)
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name


    const showDetaile = document.getElementById('show-detaile-container')
    showDetaile.innerHTML = `
    <img src="${phone.image}" alt="">
    <p><span>Storage</span>${phone?.mainFeatures?.storage}</p>
    `
    // show the modal
    show_detail_modal.showModal()
}


// handle search button
const handleSearch =(isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText)
    loadPhone(searchText, isShowAll)
}

// const handleSearch2 = () => {
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     console.log(searchText)
//     loadPhone(searchText)
// }


// handle show all

const handleShowAll =() =>{
    handleSearch(true)
}


loadPhone()
