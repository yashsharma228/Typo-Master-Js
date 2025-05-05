const input = document.querySelector(".wrapper .input-field");
const typingText = document.querySelector(".typing-text p");
const time = document.querySelector(".timeLeft span b");
const mistakes = document.querySelector(".mistake span b");
const wpm = document.querySelector(".wpm span b");
const cpm = document.querySelector(".cpm span b");
const btn = document.querySelector("button");
 
let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0; 
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const Paragraph = [
    " The computer wouldn't start. She banged on the side and tried again. Nothing. She lifted it up and dropped it to the table. Still nothing. She banged her closed fist against the top. It was at this moment she saw the irony of trying to fix the machine with violence.",
    "Generating random paragraphs can be an excellent way for writers to get their creative flow going at the beginning of the day. The writer has no idea what topic the random paragraph will be about when it appears. This forces the writer to use creativity to complete one of three common writing challenges.",
    "Another writing challenge can be to take the individual sentences in the random paragraph and incorporate a single sentence from that into a new paragraph to create a short story.",
    "Above are a few examples of how the random paragraph generator can be beneficial. The best way to see if this random paragraph picker will be useful for your intended purposes is to give it a try. Generate a number of paragraphs to see if they are beneficial to your current project.",
    "There are usually about 200 words in a paragraph, but this can vary widely. Most paragraphs focus on a single idea that's expressed with an introductory sentence, then followed by two or more supporting sentences about the idea.",
    "The third option is to have the random paragraph be the ending paragraph in a short story. No matter which of these challenges is undertaken, the writer is forced to use creativity to incorporate the paragraph into their writing.",
  ];
  let randomIndex = Math.floor(Math.random() * Paragraph.length);
  typingText.innerHTML = "";
  for (const char of Paragraph[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;
    console.log(char);
  }
  typingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => input.focus());
 
}

function initTyping() {
  const char = typingText.querySelectorAll("span");
  const typedChar = input.value.charAt(charIndex);
  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add("correct");
      console.log("correct");
    } else {
      mistake++;
      char[charIndex].classList.add("Incorrect");
      console.log("incorrect");
    }
    charIndex++;
    char[charIndex].classList.add("active");
    mistakes.innerText = mistake;
    cpm.innerText = charIndex- mistake;
  } else {
    clearInterval(timer);
    input.value = "";
  }
}

function initTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    const wpmCount = Math.round(
      ((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60
    );
    wpm.innerText = wpmCount;
  } else {
    clearInterval(timer);
  }
}

function reset(){
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  time.innerText= timeLeft;
  input.value='';
  charIndex = 0;
  mistake =0;
  isTyping = false;
  wpm.innerText=0;
  cpm.innerText=0;
  mistakes.innerText=0;
}


input.addEventListener("input", initTyping);
btn.addEventListener("click",reset);
loadParagraph();
