const form = document.getElementById("registrar");
const input = form.querySelector("input");

const mainDiv = document.querySelector('.main');
const ul = document.getElementById("invitedList");

const div = document.createElement('div');
const filterLabel = document.createElement('label');
const filterCheckBox = document.createElement('input');

filterLabel.textContent = "Hide those who haven't responded";
filterCheckBox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckBox);
mainDiv.insertBefore(div, ul);
filterCheckBox.addEventListener('change', (e) => {
  const isChecked = e.target.checked;
  const lis = ul.children;
  if (isChecked) {
    for (let i = 0; i < lis.length; i += 1) {
      let li = lis[i]; 
      if (li.className === 'responded') {
        li.style.display = ''; 
      } else {
        li.style.display = 'none'; 
      }
     }
    } else {
      for (let i = 0; i < lis.length; i += 1) {
      let li = lis[i];
        li.style.display = '';
    }
  }
});

//REFACTORED
function createLI(text) {
  function createElement(elementName, property, value) {
    const element = document.createElement(elementName);
    element[property] = value;
    return element;
  }
  
  function appendToLI(elementName, property, value) {
    const element = createElement(elementName, property, value);
    li.appendChild(element);
    return element;
  }
  
  const li = document.createElement("li");
  appendToLI('span', 'textContent', text);
  appendToLI('label', 'textContent', 'Confirmed')
    .appendChild(createElement('input', 'type', 'checkbox'));
  appendToLI('button', 'textContent', 'edit');
  appendToLI('button', 'textContent', 'remove');
  return li;
}

//THE SAME AS ABOVE, BUT NOT REFACTORIZED
// DOM SCRIPTING BY EXAMPLE CLASS; REFACTORING

//function createLI(text) {
//  
//  const li = document.createElement("li");
//  
//  const span = document.createElement('span');
//  span.textContent = text;
//  
//  li.appendChild(span);
//  
//  const label = document.createElement('label');
//  label.textContent = 'Confirmed';
//  
//  const checkbox = document.createElement('input');
//  checkbox.type = 'checkbox';
//  
//  label.appendChild(checkbox);
//  li.appendChild(label);
//  
//  const editButton = document.createElement('button');
//  editButton.textContent = 'edit';
//  
//  li.appendChild(editButton);
//  
//  const removeButton = document.createElement('button');
//  removeButton.textContent = 'remove';
//  li.appendChild(removeButton);
//  return li;
//}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value;
  input.value = "";
  const li = createLI(text);
  ul.appendChild(li);
});

ul.addEventListener('change', (e) => {
  const checkbox = event.target;
  const checked = checkbox.checked;
  const listItem = checkbox.parentNode.parentNode;
  
  if (checked) {
    listItem.className = 'responded';
  }  else {
    listItem.className = '';
  }
});

ul.addEventListener('click',(e) => {
  if (e.target.tagName === 'BUTTON') {
    const button = e.target;
    const li = button.parentNode;
    const ul = li.parentNode;
    const action = button.textContent;
    const nameActions = {
      remove: () => {
        ul.removeChild(li);  
      },
      edit: () => {
        const span = li.firstElementChild;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        li.insertBefore(input, span);
        li.removeChild(span);
        button.textContent = 'save';      
      },
      save: () => {
        const input = li.firstElementChild;
        const span = document.createElement('span');
        span.textContent = input.value;
        li.insertBefore(span, input);
        li.removeChild(input);
        button.textContent = 'edit';        
      }   
    };
    
  
  // select and run actions in button's name
    nameActions[action]();
    
  }
});


//ul.addEventListener('click',(e) => {
//  if (e.target.tagName === 'BUTTON') {
//    const button = e.target;
//    const li = button.parentNode;
//    const ul = li.parentNode;
//    if (button.textContent === 'remove') {
//      ul.removeChild(li);
//    } else if (button.textContent === 'edit') {
//      const span = li.firstElementChild;
//      const input = document.createElement('input');
//      input.type = 'text';
//      input.value = span.textContent;
//      li.insertBefore(input, span);
//      li.removeChild(span);
//      button.textContent = 'save';
//    } else if (button.textContent === 'save') {
//      const input = li.firstElementChild;
//      const span = document.createElement('span');
//      span.textContent = input.value;
//      li.insertBefore(span, input);
//      li.removeChild(input);
//      button.textContent = 'edit';
//    }
//  }
//});



