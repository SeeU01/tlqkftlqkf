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

    if (!response.ok) throw new Error('Failed to create board');
    const newBoard = await response.json();
    location.href = `/board/view?index=${newBoard._id}`;
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
});

async function getBase64Image(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
