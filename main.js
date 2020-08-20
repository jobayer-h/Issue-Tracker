document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '' ;
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
// total
  const total = JSON.parse(localStorage.getItem('issues'));
  document.getElementById('total').innerText= total.length;
}
const setStatusClosed = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  if (currentIssue.status !== 'Closed') {
    const solved = parseInt(document.getElementById('solved').innerText);
    document.getElementById('solved').innerText = solved+1;
  }
  currentIssue.status = 'Closed';
// line throw
  const closedIssue = document.getElementById(`${currentIssue.id}`);
  closedIssue.style.textDecoration = 'line-through' ;
  console.log(closedIssue);
// line throw
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  let currentIssue = issues.find(issue => issue.id == id);
  const remainingIssues = issues.filter(issue => issue !== currentIssue);
  document.getElementById('total').innerText = remainingIssues.length;
  if (currentIssue.status == 'Closed') {
    const solved = parseInt(document.getElementById('solved').innerText);
    document.getElementById('solved').innerText = solved-1;
  }
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="${id}" class="${status==='Closed' ? 'description' : ''}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
