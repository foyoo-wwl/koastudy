const {
    set,
    get
} = require('./_redis')

//set("today", "511", 100000)
get("name").then((res) => {
    console.log(res)
})