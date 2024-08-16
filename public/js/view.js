document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const boardId = params.get('index');

  try {
    const response = await fetch(`/api/boards/${boardId}`);
    if (!response.ok) throw new Error('Failed to fetch board details');
    const board = await response.json();

    document.querySelector("#subject").textContent = board.subject;
    document.querySelector("#writer").textContent = board.writer;
    document.querySelector("#content").textContent = board.content;
    document.querySelector("#date").textContent = new Date(board.date).toLocaleDateString();
    document.querySelector("#views").textContent = board.views;

    if (board.image) {
      const img = document.createElement('img');
      img.src = board.image;
      document.querySelector("#imageContainer").appendChild(img);
    }
  } catch (e) {
    console.error(e);
    alert('게시물 정보를 불러오는 데 실패했습니다.');
  }
});
