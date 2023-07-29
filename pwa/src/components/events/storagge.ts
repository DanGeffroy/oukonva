export const fetchFromLambda = async (): Promise<any[]> => {
  const dateString = localStorage.getItem("lambdaScrapDate");

  if (dateString) {
    const storageDate = new Date(+dateString);
    const isToday = storageDate.toDateString() == new Date().toDateString();
    if (isToday) {
      document.getElementById("splash-screen")?.classList.toggle("hidden");
      document.getElementById("header-title")?.classList.toggle("hidden");
      return JSON.parse(localStorage.getItem("lambdaData") as any);
    }
  }

  const lambdaData = await fetch(
    "https://w7n25we2bof5357qirtk75zxq40obrpn.lambda-url.eu-north-1.on.aws/"
  );
  const events = await lambdaData.json();
  localStorage.setItem("lambdaData", JSON.stringify(events));
  localStorage.setItem("lambdaScrapDate", Date.now().toString());
  document.getElementById("splash-screen")?.classList.toggle("hidden");
  document.getElementById("header-title")?.classList.toggle("hidden");
  return events;
};
