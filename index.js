// เลือกองค์ประกอบจาก DOM ที่จำเป็น
const gameContainer = document.querySelector('.container'); // ส่วนของหน้าจอเกม
const userResult = document.querySelector('.user_result img'); // รูปภาพผลลัพธ์ของผู้เล่น
const cpuResult = document.querySelector('.cpu_result img'); // รูปภาพผลลัพธ์ของคอมพิวเตอร์
const result = document.querySelector('.result'); // ข้อความแสดงผลลัพธ์
const optionImages = document.querySelectorAll('.option_image'); // รูปภาพตัวเลือก (เช่น หิน, กระดาษ, กรรไกร)
const round = document.getElementById('round'); // ข้อความแสดงรอบที่เล่น
const score = document.getElementById('score'); // ข้อความแสดงคะแนน

// ตั้งค่าตัวแปรเริ่มต้น
let count = 0; // ตัวนับรอบเริ่มต้นที่ 0
let Score_user = 0; // คะแนนของผู้เล่นเริ่มต้นที่ 0
let Score_cpu = 0; // คะแนนของคอมพิวเตอร์เริ่มต้นที่ 0
let totalRounds = Infinity; // จำนวนรอบที่ตั้งค่าเป็นไม่จำกัดเริ่มต้นที่ Infinity
let falseRounds = false;

alert('โปรดเลือกจำนวนครั้งด้านล่าง ก่อนเริ่มเกม');

function updateResult(userValue, cpuValue) {
  // วัตถุที่กำหนดผลลัพธ์ของเกมตามการเปรียบเทียบระหว่างผู้เล่นและคอมพิวเตอร์
  const outcomes = {
    RR: "Draw", // หิน vs หิน
    RP: "Cpu", // หิน vs กระดาษ
    RS: "User", // หิน vs กรรไกร
    PP: "Draw", // กระดาษ vs กระดาษ
    PR: "User", // กระดาษ vs หิน
    PS: "Cpu", // กระดาษ vs กรรไกร
    SS: "Draw", // กรรไกร vs กรรไกร
    SR: "Cpu", // กรรไกร vs หิน
    SP: "User", // กรรไกร vs กระดาษ
  };

  const outComeValue = outcomes[userValue + cpuValue]; // รับผลลัพธ์จากการเปรียบเทียบ
  result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`; // แสดงข้อความผลลัพธ์

  // อัปเดตคะแนนและข้อความชื่อเอกสารตามผลลัพธ์
  if (outComeValue === "User") {
    Score_user++;
    document.title = "User Won!!";
  } else if (outComeValue === "Cpu") {
    Score_cpu++;
    document.title = "Cpu Won!!";
  } else {
    document.title = "Match Draw";
  }

  // แสดงคะแนนในรูปแบบที่ต้องการ
  score.innerHTML = `Score<br>
  <span class="team-label">User</span>&emsp;&emsp; 
  ${Score_user} : ${Score_cpu} 
  &emsp;&emsp;<span class="team-label">Cpu</span>`;
}

// ฟังก์ชันในการจัดการคลิกของตัวเลือก
function handleOptionClick(e) {
  // ตรวจสอบสถานะเกมก่อนดำเนินการ
  if (!gameActive) {
    return;
  }
  
  // ตรวจสอบจำนวนรอบก่อนดำเนินการ
  if (count >= totalRounds && Score_user < Score_cpu) {
    alert('จบเกม! Cpu Won'); // แจ้งเตือนว่าเกมจบ Cpu Won
    return;
  } else if (count >= totalRounds && Score_user > Score_cpu) {
    alert('จบเกม! User Won'); // แจ้งเตือนว่าเกมจบ User Won
    return;
  } else if (count >= totalRounds && Score_user === Score_cpu) {
    alert('จบเกม! Match Draw'); // แจ้งเตือนว่าเกมจบ Match Draw
    return;
  }

  const image = e.target; // รูปภาพที่ถูกคลิก
  const index = [...optionImages].indexOf(image); // หาค่าดัชนีของตัวเลือกที่ถูกคลิก

  image.classList.add('active'); // เพิ่มคลาส 'active' ให้กับตัวเลือกที่ถูกคลิก

  count++; // เพิ่มจำนวนรอบ
  round.textContent = `Round ${count}`; // อัปเดตข้อความแสดงรอบ
  document.title = 'Wait...'; // เปลี่ยนชื่อเอกสารเป็น 'Wait...'

  userResult.src = cpuResult.src = 'rock.png'; // ตั้งค่าผลลัพธ์เริ่มต้นเป็น 'rock.png'
  result.textContent = 'Wait...'; // ตั้งค่าข้อความผลลัพธ์เริ่มต้นเป็น 'Wait...'

  // เอาคลาส 'active' ออกจากตัวเลือกที่ไม่ได้ถูกคลิก
  optionImages.forEach((image2, index2) => {
    if (index !== index2) image2.classList.remove('active');
  });

  gameContainer.classList.add('start'); // เพิ่มคลาส 'start' ให้กับคอนเทนเนอร์เกม

  // รอ 2 วินาทีเพื่อแสดงผลลัพธ์
  setTimeout(() => {
    gameContainer.classList.remove('start'); // ลบคลาส 'start' หลังจากรอเสร็จ

    const imageSrc = image.querySelector('img').src; // รับที่อยู่ของรูปภาพที่ถูกคลิก
    userResult.src = imageSrc; // ตั้งค่าผลลัพธ์ของผู้เล่น

    // สุ่มค่าของคอมพิวเตอร์ (0 = rock, 1 = paper, 2 = scissors)
    const randomNumber = Math.floor(Math.random() * 3);
    const cpuImage = ['rock.png', 'paper.png', 'scissors.png'];
    cpuResult.src = cpuImage[randomNumber]; // ตั้งค่าผลลัพธ์ของคอมพิวเตอร์

    const cpuValue = ['R', 'P', 'S'][randomNumber]; // แปลงตัวเลขที่สุ่มได้เป็นค่า 'R', 'P', 'S'
    const userValue = ['R', 'P', 'S'][index]; // แปลงดัชนีที่คลิกได้เป็นค่า 'R', 'P', 'S'

    updateResult(userValue, cpuValue); // อัปเดตผลลัพธ์
  }, 2000);
}

// ฟังก์ชันในการกำหนดจำนวนรอบที่ต้องการเล่น
function getValue() {
  const selectElement = document.getElementById('number'); // เลือกองค์ประกอบของ <select>
  const selectedValue = selectElement.value; // รับค่าที่เลือก

  // กำหนดจำนวนรอบตามที่เลือก
  if (['3', '5', '7', '10'].includes(selectedValue)) {
    totalRounds = parseInt(selectedValue, 10); // ตั้งค่าจำนวนรอบตามที่เลือก
    alert(`จำนวนครั้งที่เลือก ${totalRounds} รอบ`); // แจ้งเตือนจำนวนรอบที่ตั้งค่า
    gameActive = true; // เปิดใช้งานเกม
    Score_user = 0;
    Score_cpu = 0;
  } else if (selectedValue === "Unlimited") {
    totalRounds = Infinity; // กำหนดให้ไม่จำกัดรอบ
    alert('เล่นไม่จำกัดรอบ'); // แจ้งเตือนว่าเล่นแบบไม่จำกัดรอบ
    gameActive = true; // เปิดใช้งานเกม
    Score_user = 0;
    Score_cpu = 0;
  }

  count = 0; // รีเซ็ตตัวนับรอบเมื่อเลือกจำนวนรอบใหม่
  round.textContent = `Round ${count}`; // อัปเดตข้อความแสดงรอบ
  score.innerHTML = `Score<br>
  <span class="team-label">User</span>&emsp;&emsp; 
  ${Score_user} : ${Score_cpu} 
  &emsp;&emsp;<span class="team-label">Cpu</span>`; // รีเซ็ตคะแนน
}

// เพิ่มฟังก์ชันคลิกให้กับตัวเลือกทั้งหมด
optionImages.forEach((image) => {
  image.addEventListener('click', handleOptionClick); // เพิ่มการจัดการคลิกให้กับรูปภาพตัวเลือกทั้งหมด
});
