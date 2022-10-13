const goGithubElement = document.querySelector('.go-github');

window.onload = () => {
  setTimeout(() => {
    goGithubElement.style.transform = 'translateX(-60%)';
  }, 300);
}