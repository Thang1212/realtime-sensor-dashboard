function formatDateTimeVN(input) {
  const d = new Date(input);

  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");

  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  return `${hh}:${mm}:${ss} ${day}/${month}/${year}`;
}

module.exports = { formatDateTimeVN };
