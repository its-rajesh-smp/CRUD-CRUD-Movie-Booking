window.addEventListener('DOMContentLoaded',(e)=>{
    if(localStorage.getItem('key')){
        document.querySelector('.CURDkey').outerHTML=`
        <input  class="CURDkey" disabled  type="text" name="key" placeholder="Enter CURD key">
        `
        document.querySelector('.target_key').outerHTML=`
        <button disabled class="target_key"><i class='bx bx-target-lock'></i></button>
        `
        document.querySelector('.CURDkey').value=localStorage.getItem("key")

        getItems(localStorage.getItem("key"))
    }
    else{
        alert('CURD key not present')
    }
})


document.querySelector('.release_key').addEventListener('click',(e)=>{
    e.preventDefault()
    localStorage.removeItem('key')
    document.querySelector('.CURDkey').outerHTML=`
    <input  class="CURDkey"   type="text" name="key" placeholder="Enter CURD key">
    `
    document.querySelector('.target_key').outerHTML=`
    <button  class="target_key"><i class='bx bx-target-lock'></i></button>
    `
    alert('Old Key released | Upload New Key')
})



// Add key to target
document.querySelector('.target_key').addEventListener('click',(e)=>{
    e.preventDefault()
    if(document.querySelector('.CURDkey').value!=""){    
        localStorage.setItem('key',document.querySelector('.CURDkey').value.toLowerCase())
        document.querySelector('.CURDkey').outerHTML=`
        <input  class="CURDkey" disabled  type="text" name="key" placeholder="Enter CURD key">
        `
        document.querySelector('.target_key').outerHTML=`
        <button disabled class="target_key"><i class='bx bx-target-lock'></i></button>
        `
        document.querySelector('.CURDkey').value=localStorage.getItem("key")
    }
})




// Add User
document.querySelector('.addUser_btn').addEventListener('click',(e)=>{
    e.preventDefault()
    let name=document.querySelector('.name').value
    let email=document.querySelector('.email').value

    console.log(name,email);

    let accessKey=`https://crudcrud.com/api/${localStorage.getItem('key')}/registrations`
    axios.post(accessKey,{
        "name":name,
        "email":email
    }).then((res)=>{
        showOutput(res.data)
    }).catch((error)=>{
        showStatus(error)
    })

})



// Delete User
document.querySelector('.container').addEventListener('click',e=>{
    if(e.target.parentElement.classList.contains("btn_dele")){
    let target_id=e.target.parentElement.parentElement.parentElement.children[0].textContent
    let accessKey=`https://crudcrud.com/api/${localStorage.getItem('key')}/registrations/${target_id}`
        axios.delete(accessKey).then(()=>{
            e.target.parentElement.parentElement.parentElement.remove()
        })
        .catch((error)=>{
            showStatus(error)
        })
    }
})



// Update User
document.querySelector('.container').addEventListener('click',e=>{
    if(e.target.parentElement.classList.contains("btn_edit")){
        let name=prompt("Enter Your Updated Name")
        let email=prompt("Enter Your Updated Email")
        if(name=="" || email==""){return}


        let target_id=e.target.parentElement.parentElement.parentElement.children[0].textContent
        let accessKey=`https://crudcrud.com/api/${localStorage.getItem('key')}/registrations/${target_id}`
        axios.put(accessKey,{
            "name":name,
            "email":email
        }).then((res)=>{
            e.target.parentElement.parentElement.parentElement.children[1].textContent=name
            e.target.parentElement.parentElement.parentElement.children[2].textContent=email

        })
        .catch((error)=>{
            showStatus(error)
        })

    }
})




// Get User
function getItems(key){
    let accessKey=`https://crudcrud.com/api/${key}/registrations`

    console.log(accessKey);

    axios.get(accessKey)
        .then((res)=>{
            res.data.forEach(item => {
                showOutput(item)
            });
        })
        .catch((error)=>{
            showStatus(error)
        })


}


// Print Element
function showOutput(item){
    
    let newElement=document.createElement('div')
    newElement.innerHTML=`
     
        <div class="user">
        <p>${item._id}</p>
        <p>${item.name}</p>
        <p>${item.email}</p>
        <div>
            <button class="btn_edit" ><i class='bx bx-edit'></i></button>
            <button class="btn_dele" ><i class='bx bx-message-square-x'></i></i></button>
        </div>
        </div>
    `
    document.querySelector('.container').append(newElement)
}


function showStatus(error){
    if(localStorage.getItem('key')){
        alert(' Error Occures | Curd Link Expired | Release the key and upload new key '+ error.code)
    }
    else{
        alert('CURD key not present')
    }
    return
}