const openButton = document.getElementById('open-modal')
const closeModalButton =document.getElementById('close-modal')
const modalDonation = document.getElementById('modal-new')
const donationForm = document.getElementById('donation-form')
const saveDonationButton = document.getElementById('save-donation')

const getDonationData = () => {
  const donationData = {
    email: document.getElementById('email')?.value,
    name: document.getElementById('name')?.value,
    lastName: document.getElementById('last-name')?.value,
    identification: document.getElementById('identification')?.value
  }
  return donationData;
}

const saveDonation = async () => {
  const donationData = getDonationData();
  const url = 'add url here';

  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(donationData),
  });
  return response.json();
}

openButton.addEventListener('click',()=>{
  modalDonation.style.animation='pop 0.3s linear'
  modalDonation.style.display = 'flex'
})

closeModalButton.addEventListener('click',()=>{
  modalDonation.style.animation = 'reversePop 0.3s linear'
    setTimeout(function(){ modalDonation.style.display = 'none'}, 300);
});


saveDonationButton.addEventListener('click', ()=>{
  getDonationData();
})
