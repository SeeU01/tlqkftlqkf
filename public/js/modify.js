document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const boardId = params.get('index');

  try {
    const response = await fetch(`/api/boards/${boardId}`);
    if (!response.ok) throw new Error('Failed to fetch board details');
    const board = await response.json();

    document.querySelector("#subject").value = board.subject;
    document.querySelector("#writer").value = board.writer;
    document.querySelector("#content").value = board.content;
  } catch (e) {
    console.error(e);
    alert('게시물 정보를 불러오는 데 실패했습니다.');
  }

  document.querySelector("#modifyFrm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const subject = e.target.subject.value;
    const writer = e.target.writer.value;
    const content = e.target.content.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(`/api/boards/${boardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          writer,
          content,
          password,
        }),
      });

      if (!response.ok) throw new Error('Failed to update board');
      alert('게시물이 수정되었습니다.');
      location.href = `/board/view?index=${boardId}`;
    } catch (e) {
      console.error(e);
      alert('게시물 수정에 실패했습니다.');
    }
  });
});
