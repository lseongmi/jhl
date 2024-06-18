let alldata;


const showData = (data) =>{
    //data에서 하나씩 뽑아서 <article> -> .product_container의 자식으로 넣자 <- html
    const productContainerSection = document.getElementsByClassName('product-container')[0];
    articleString = "";
    data.forEach(element => {
        articleString += `          <section class="product-container">
        <article class="product-item">
            <img src="images/${element["image"]}" alt="${element.name}" class="product-image">
            <div class="product-name">${element.name}</div>
        </article>\n`;
    });
    
    productContainerSection.innerHTML = articleString;
    

}
 

const setData = (data)=>{
    alldata = data;
    showData(data);
    //무뚝뚝.webp출력
    /*const moo = [data[3]["image"]];
    console.log(moo);

    //허니버터칩 출력
    const chip = [data[9]["name"]];
    console.log(chip);*/

    
}

const getData = (() =>{
    const url = 'js/data.json';
    fetch(url)
    .then((response)=> response.json())
    .then((data)=>setData(data))
    .catch((error)=>console.log(error));
});

getData();
 
const searchData = (query) =>{
    console.log(query);
    // data 하나씩 꺼내어, name이랑 query랑 비교해서 있으면, 모아놓자
    let searchData =  alldata.filter((oneData)=>oneData['name'].includes(query));
    showData(searchData);
}