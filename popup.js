function clickBtnOff(){
    document.getElementById('btnOff').classList.add('btn-primary');
    document.getElementById("btnRemoveLink").classList.remove('btn-primary');
    document.getElementById("btnRemoveBtn").classList.remove('btn-primary');
}

function clickRemoveLink(){
    document.getElementById('btnRemoveLink').classList.add('btn-primary');
    document.getElementById("btnOff").classList.remove('btn-primary');
    document.getElementById("btnRemoveBtn").classList.remove('btn-primary');
}

function clickRemoveBtn(){
    document.getElementById('btnRemoveBtn').classList.add('btn-primary');
    document.getElementById("btnRemoveLink").classList.remove('btn-primary');
    document.getElementById("btnOff").classList.remove('btn-primary');
}
