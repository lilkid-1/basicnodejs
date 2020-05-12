var update = document.getElementById('update')
update.addEventListener('click', () =>{
    fetch('quotes', {
        method: 'put',
        headers: {'content-Type':'application/json'},
        body: JSON.stringify({
            'name':'max',
            'quote':'Chase yo dreams.'
        })
    })
    fetch({})
    .then(res => {
        if (res.ok) return res.json()
    })
    .then(data => {
        console.log(data)
        window.location.reload(true)
    })
})