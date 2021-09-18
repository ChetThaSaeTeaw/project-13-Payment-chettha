// 1. ดึง Element จาก ID มาใช้
let balance = document.getElementById('balance');
let moneyPlus = document.getElementById('money-plus');
let moneyMinus = document.getElementById('money-minus');
let list = document.getElementById('list');
let form = document.getElementById('form');
let text = document.getElementById('text');
let amount = document.getElementById('amount');
//2. สร้างตัวแปรเก็บค่า Obj(ชุดข้อมูล) สามารถลบส่วนนี้ได้ถ้าต้องการค่าเปล่าๆ
/*let dataTransaction = [
    {id:1,text:"ค่าขนม",amount:-100},
    {id:2,text:"ค่าผ่อนรถยนต์",amount:-9000},
    {id:3,text:"เงินเดือน",amount:+15900},
    {id:4,text:"ค่าอาหาร", amount:-500},
    {id:4,text:"ค่าสอนพิเศษ", amount:2500}
]*/
//3. สร้างตัวแปรมาเก็บค่าตัวแปร obj 
let transactions = [];

function init(){
    list.innerHTML = "";
    transactions.forEach(addDataToList);
    calculateMoney();
}

//4.สร้างฟังชั่น เพิ่มรายการ(List)
function addDataToList(transactions){
    let symbol = transactions.amount < 0 ? "-":"+"; //ตัวแปร symbol เก็บค่าของข้อมูลตัว amount สร้างเงื่อนไขแบบ Ternary Operator คือ ถ้า amount น้อยกว่า 0(true) ให้เพิ่ม - แต่ถ้าไม่ใช้ ให้เพิ่ม + (false)  
    const status = transactions.amount < 0 ? "minus" : "plus";
    const item = document.createElement('li'); //ตัวแปร item ทำการสร้าง Element tag li ใหม่ในหน้า html โดน ${ดึงข้อมูลจากตัวแปรที่เก็บข้อมูล} + tag html ที่จะให้ทำงาน ${symbol ทำการคำนวณแสดงผลค่า - , + ออกมา}${Math.abs ชื่อเต็มคือ Math.absolute จะทำการแปลงค่าตัวเลขให้เป็น - กับ + ตามค่าจริง}
    result = formatNumber(Math.abs(transactions.amount))
    item.classList.add(status);
    item.innerHTML = `${transactions.text}<span>${symbol}${result}</span><button onclick="removeList(${transactions.id})" class="delete-btn">x</button>`;
    list.appendChild(item); //ให้ตัวแปร list เพิ่ม tag Element ลูกๆจากตัวแปร item
}

//6.ฟังชั้นเพิ่ม , ลงในตัวเลข
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

//8.สร้างฟังชั่นสุ่ม ID idใช้ตอนทำการลบข้อมูล idไม่สามารถซํ้ากันได้
function autoId(){
    return Math.floor(Math.random()*1000000);
}

//5.สร้างฟังชั่นคำนวณเงิน
function calculateMoney(){
    const amounts = transactions.map(transactions => transactions.amount);//ทำการดึงข้อมูลที่ต้องการมาเก็บในตัวแปร
    const total = amounts.reduce((result,item) => (result+=item),0).toFixed(2);//ทำการกรองข้อมูลโดยใช้ reduce โครงสร้าง (ผลลัพธ์จากการคำนวณ,ตำแหน่งIndex) => (ผลลัพธ์ + ตำแหน่งแล้วเก็บไว้ใน ผลลัพธ์)ค่าเริ่มต้น 0
    const inCome = amounts.filter(item=>item > 0).reduce((result,item) => (result+=item),0).toFixed(2); //กรองข้อมูลที่เป็นรายรับไว้ในตัวแปร
    const pay = (amounts.filter(item=>item < 0).reduce((result,item) => (result+=item),0)*-1).toFixed(2);//กรองข้อมูลที่เป็นรายจ่ายไว้ในตัวแปร
    balance.innerText = `฿` + formatNumber(total);
    moneyPlus.innerText = `฿` + formatNumber(inCome);
    moneyMinus.innerText = `฿` + formatNumber(pay);
}

//8.ฟังชั่นลบรายการ
function removeList(id){
    transactions =  transactions.filter(transactions => transactions.id !== id)
    init();
}

//7.ฟังชั่นแบบฟอร์ม
function addTransaction(event){
    event.preventDefault(); //เวลาโหลดข้อมูลกันไม่ให้หน้ากระพริบ
    if(text.value.trim() === '' || amount.value.trim() === ''){ //ถ้าข้อมูลที่ดึงจาก text เป็นช่องว่าง trim() === '' หรือ ข้อมูลที่ดึงจาก amount เป็นช่องว่าง จะลงไปทำงานด้านล่าง  
        alert('กรุณากรอกข้อมูลด้วยครับ'); 
    } else {
       const data = {
           id: autoId(),
           text:text.value,
           amount:+amount.value
       }
       transactions.push(data);
       addDataToList(data);
       calculateMoney();
       text.value="";
       amount.value="";
    }
}

form.addEventListener('submit', addTransaction);


init();
