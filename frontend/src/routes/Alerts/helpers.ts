export function formatTimestamp(timestamp: Date) {
  const date = timestamp;

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
      ? "nd"
      : day % 10 === 3 && day !== 13
      ? "rd"
      : "th";
  const month = date.toLocaleString("default", { month: "short" });

  return `${formattedHours}:${formattedMinutes} ${period}, ${day}${suffix} ${month}`;
}

export function htmlToText(html: string) {
  var temp = document.createElement("div");
  temp.innerHTML = html;
  return temp.textContent; // Or return temp.innerText if you need to return only visible text. It's slower.
}
