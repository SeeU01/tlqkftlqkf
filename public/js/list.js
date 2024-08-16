document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('/api/boards');
    if (!response.ok) throw new Error('Failed to fetch boards');
    const boards = await response.json();

    const listContainer = document.querySelector("#listContainer");
    listContainer.innerHTML = boards.map(board => `
      <div class="board-item">
        <h3>${board.subject}</h3>
        <p>작성자: ${board.writer}</p>
        <p>${new Date(board.date).toLocaleDateString()}</p>
        <a href="/board/view?index=${board._id}">상세보기</a>
      </div>
    `).join('');
  } catch (e) {
    console.error(e);
    alert('게시물을 불러오는 데 실패했습니다.');
  }
});
