import dayjs from "dayjs";
import express from "express";

const app = express();

const holidays = [
  { date: "1/1/2022", name: "Confraternização mundial" },
  { date: "1/3/2022", name: "Carnaval" },
  { date: "4/17/2022", name: "Páscoa" },
  { date: "4/21/2022", name: "Tiradentes" },
  { date: "5/1/2022", name: "Dia do trabalho" },
  { date: "6/16/2022", name: "Corpus Christi" },
  { date: "9/7/2022", name: "Independência do Brasil" },
  { date: "10/12/2022", name: "Nossa Senhora Aparecida" },
  { date: "11/2/2022", name: "Finados" },
  { date: "11/15/2022", name: "Proclamação da República" },
  { date: "12/25/2022", name: "Natal" }
];

app.get("/holydays", (req, res) => {
  res.send(holidays);
})

app.get("/is-today-holiday", (req, res) => {
  const today = dayjs().format('M/D/YYYY')
  let isHoliday = false; 

  for(let i = 0; i < holidays.length; i++){
    if(holidays[i].date === today){
      res.send(`Sim, hoje é ${holidays[i].name}`);
      isHoliday = true;
    }
  }
  
  if(!isHoliday){
    res.send("Não, hoje não é feriado");
  }
})

app.get("/holidays/:holidayMonth", (req, res) => {
  const monthUser = req.params.holidayMonth;

  const monthUserHolidays = holidays.filter((holiday)=>{
    if(holiday.date[1] === '/' && holiday.date[0] === monthUser){
      return holiday;
    }else if(holiday.date[0] + holiday.date[1] === monthUser){
      return holiday;
    }
  })

  if (monthUserHolidays.length !== 0){
    res.send(monthUserHolidays)
  }else{
    res.send("Parece que não há feriados nesse mês :/")
  }
})

app.listen(5000)