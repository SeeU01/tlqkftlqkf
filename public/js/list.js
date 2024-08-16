document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch('/api/boards');
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch boards');
    }
    const boards = await response.json();

    const listContainer = document.querySelector("#listContainer");
    if (boards.length === 0) {
      listContainer.innerHTML = '<p>게시물이 없습니다.</p>';
    } else {
      listContainer.innerHTML = boards.map(board => `
        <div class="board-item">
          <h3>${board.subject}</h3>
          <p>작성자: ${board.writer}</p>
          <p>${new Date(board.date).toLocaleDateString()}</p>
          <a href="/board/view?index=${board._id}">상세보기</a>
        </div>
      `).join('');
    }
  } catch (e) {
    console.error('Error fetching boards:', e);
    alert('게시물을 불러오는 데 실패했습니다: ' + e.message);
  }
});
