export const covertDateIntoYYMMDD = (selectedDate: Date) => {
  try {
    const date = new Date(selectedDate);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    const day = String(date.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  } catch (error) {
    console.error(`Unable to convert date in covertDateIntoYYMMDD func, error: ${error}`);
  }
};
