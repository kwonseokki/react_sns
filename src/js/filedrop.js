const fileDrop = (e)=>{
    let dropZone = document.getElementById('drop-zone');
    console.log(e);
    dropZone.style.backgroundColor = 'skyblue';
}

export {fileDrop}
