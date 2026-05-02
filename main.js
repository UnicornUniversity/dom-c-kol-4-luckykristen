/**
 * List of male first names.
 */
const maleNames = [
     "Jan", "Petr", "Josef", "Pavel", "Martin", "Tomáš", "Miroslav", "František", "Jakub", "Karel",
    "Lukáš", "Jaroslav", "Jiří", "Milan", "Roman", "David", "Václav", "Michal", "Ondřej", "Aleš",
    "Radek", "Zdeněk", "Marek", "Daniel", "Patrik"
  ];

/**
 * List of female first names.
 */
  const femaleNames = [
    "Jana", "Marie", "Eva", "Hana", "Anna", "Lenka", "Kateřina", "Lucie", "Věra", "Alena",
    "Petra", "Veronika", "Martina", "Tereza", "Barbora", "Michaela", "Monika", "Zuzana", "Ivana", "Klára",
    "Nikola", "Eliška", "Kristýna", "Adéla", "Simona"
  ];

/**
 * List of male surnames.
 */
  const maleSurnames = [
    "Novák", "Svoboda", "Novotný", "Dvořák", "Černý", "Procházka", "Kučera", "Veselý", "Horák", "Němec",
    "Marek", "Pospíšil", "Hájek", "Jelínek", "Král", "Růžička", "Beneš", "Fiala", "Sedláček", "Doležal",
    "Zeman", "Kolář", "Navrátil", "Čermák", "Vaněk"
  ];

/**
 * List of female surnames.
 */
  const femaleSurnames = [
    "Nováková", "Svobodová", "Novotná", "Dvořáková", "Černá", "Procházková", "Kučerová", "Veselá", "Horáková", "Němcová",
    "Marková", "Pospíšilová", "Hájková", "Jelínková", "Králová", "Růžičková", "Benešová", "Fialová", "Sedláčková", "Doležalová",
    "Zemanová", "Kolářová", "Navrátilová", "Čermáková", "Vaňková"
  ];

/**
 * Possible workload values in hours per week.
 */
  const workloads = [10, 20, 30, 40];

 /**
* Number of milliseconds in one year.
*/
  const year_ms = 365.25 * 24 * 60 * 60 * 1000;

  /**
 * Returns random item from an array.
 * @param {Array} array Array of values.
 * @returns {*} Randomly selected item.
 */
  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }


/**
 * Generates random birthdate according to minimum and maximum age.
 * @param {number} minAge Minimum age.
 * @param {number} maxAge Maximum age.
 * @returns {string} Birthdate in ISO format.
 */

  function generateBirthdate(minAge, maxAge) {
    const now = Date.now();

    const minBirthdateTime = now - maxAge * year_ms;
    const maxBirthdateTime = now - minAge * year_ms;

    const randomBirthdateTime =
      minBirthdateTime + Math.random() * (maxBirthdateTime - minBirthdateTime);

    return new Date(randomBirthdateTime).toISOString();
  }


/**
 * Calculates age from birthdate.
 * @param {string} birthdate Birthdate in ISO format.
 * @returns {number} Age as decimal number.
 */
  function getAge(birthdate) {
    const now = Date.now();
    const birth = new Date(birthdate).getTime();

    return (now - birth) / year_ms;
  }

/**
 * Calculates average value from an array of numbers.
 * @param {number[]} numbers Array of numbers.
 * @returns {number} Average value.
 */
  function getAverage(numbers) {
    if (numbers.length === 0) return 0;

    const sum = numbers.reduce((acc, n) => acc + n, 0);
    return sum / numbers.length;
  }

/**
 * Calculates median value from an array of numbers.
 * @param {number[]} numbers Array of numbers.
 * @returns {number} Median value.
 */
  function getMedian(numbers) {
    if (numbers.length === 0) return 0;

    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 1) {
      return sorted[middle];
    }

    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

//TODO doc
/**
 * The main function which calls the application. 
 * Please, add specific description here for the application purpose.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {object} containing the statistics
 */
export function main(dtoIn) {
  const employees = generateEmployeeData(dtoIn);
  const dtoOut = getEmployeeStatistics(employees);

  return dtoOut;
}


/**
 *  Generates a list of employees based on input parameters.
 * 
 * The function creates the required number of employees (dtoIn.count).
 * For each employee it:
 * - randomly selects gender ("male" or "female")
 * - selects a name and surname based on gender
 * - assigns a random workload from predefined values [10, 20, 30, 40]
 * - generates a birthdate within the specified age range (dtoIn.age.min, dtoIn.age.max)
 * 
 * Each employee is stored as an object with properties:
 * gender, birthdate, name, surname and workload.
 * @param {object} dtoIn contains count of employees, age limit of employees {min, max}
 * @returns {Array} of employees
 */
export function generateEmployeeData(dtoIn) {

  const employees = []; 

  for (let i = 0; i < dtoIn.count; i++) {
    const gender = getRandomItem(["male", "female"]);

    const employee = {
      gender: gender,
      birthdate: generateBirthdate(dtoIn.age.min, dtoIn.age.max),
      name: gender === "male" ? getRandomItem(maleNames) : getRandomItem(femaleNames),
      surname: gender === "male" ? getRandomItem(maleSurnames) : getRandomItem(femaleSurnames),
      workload: getRandomItem(workloads)
    };

    employees.push(employee);

  }
  
  return employees;
  //let dtoOut = exGenerateEmployeeData(dtoIn);
}

/**
 * Calculates statistics from the generated list of employees.
 *
 * The function calculates:
 * - total number of employees
 * - number of employees by workload: 10, 20, 30 and 40 hours per week
 * - average age rounded to one decimal place
 * - minimum age of the youngest employee
 * - maximum age of the oldest employee
 * - median age
 * - median workload
 * - average workload of female employees
 * - list of employees sorted by workload from the lowest to the highest value
 * @param {Array} employees containing all the mocked employee data
 * @returns {object} statistics of the employees
 */
export function getEmployeeStatistics(employees) {
  const ages = employees.map(e => getAge(e.birthdate)); //pole věků
  const workloadsArr = employees.map(e => e.workload); //pole úvazků

  const dtoOut = {};

  dtoOut.total = employees.length;

  dtoOut.workload10 = employees.filter(e => e.workload === 10).length;
  dtoOut.workload20 = employees.filter(e => e.workload === 20).length;
  dtoOut.workload30 = employees.filter(e => e.workload === 30).length;
  dtoOut.workload40 = employees.filter(e => e.workload === 40).length;
  
  dtoOut.averageAge = Number(getAverage(ages).toFixed(1));
  dtoOut.minAge = Math.round(Math.min(...ages));
  dtoOut.maxAge = Math.round(Math.max(...ages));
  dtoOut.medianAge = Math.round(getMedian(ages));

  dtoOut.medianWorkload = getMedian(workloadsArr);

  const women = employees.filter(e => e.gender === "female");
  const womenWorkloads = women.map(w => w.workload);

  dtoOut.averageWomenWorkload = Number(getAverage(womenWorkloads).toFixed(1));

  dtoOut.sortedByWorkload = [...employees].sort(
    (a, b) => a.workload - b.workload
  );

  //let dtoOut = exGetEmployeeStatistics(employees);
  return dtoOut;
}