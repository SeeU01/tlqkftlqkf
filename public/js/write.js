document.querySelector("#writeFrm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const subject = e.target.subject.value;
  const writer = e.target.writer.value;
  const content = e.target.content.value;
  const password = e.target.password.value;
  const imageFile = e.target.image.files[0];

  try {
    if (password.length !== 4) throw new Error("비밀번호는 4자리여야 합니다.");

    const imageBase64 = imageFile ? await getBase64Image(imageFile) : "";

    const response = await fetch('/api/boards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subject,
        writer,
        content,
        password,
        image: imageBase64,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create board');
    }

    alert('게시글이 성공적으로 작성되었습니다.');
    location.href = `/board/view?index=${data._id}`;
  } catch (e) {
    alert('게시글 작성 실패: ' + e.message);
    console.error('Error creating board:', e);
  }
});
