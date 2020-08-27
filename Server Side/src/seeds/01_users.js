exports.seed = function (knex) {
  // Deletes ALL existing entries
  return (
    knex('user')
      // .del()
      .then(function () {
        // Inserts seed entries
        return knex('user').insert([
          // {
          //   id: 0,
          //   fname: 'prajwal',
          //   lname: 'basnet',
          //   username: 'prajwal',
          //   password: '$2a$12$A/m5CaEacPAWeH7ieZbPBuSmBYmip/xQz1Q4hJW2H0VEyDJJzzts6', //P@ssw0rd
          //   email: 'myfuturemail@gmail.com',
          //   role: 'admin'
          // },
          // {
          //   id: 1,
          //   fname: 'Daniel',
          //   lname: 'Bryan',
          //   email: 'yesman@gmail.com',
          //   username: 'yessman',
          //   password: '$2a$12$.oV3Ipe2Ec5K60X6X/WVyuYzDIdblLoPsk8j9cslz1drSV/aE9I66', //D@niel12
          //   role: 'project manager'
          // },
          // {
          //   id: 2,
          //   fname: 'John',
          //   lname: 'Cena',
          //   email: 'mytimeisnow@yahoo.com',
          //   username: 'mrnobody',
          //   password: '$2a$12$QZJRCIr1PuhbpDvtTScdyeaTRSawUu2ibvjS6bauBRK2/6UywOhAi', //J0hncen@
          //   role: 'engineer'
          // },
          // {
          //   id: 3,
          //   fname: 'Triple',
          //   lname: 'HHH',
          //   email: 'ownerofwwe@yahoo.com',
          //   username: 'tripleh',
          //   password: '$2a$12$PNPCsPYPZ3Yy9.lYTznqIuTjn2KScsyAiZCYa1hUwyVMtDE.UxRDG',
          //   role: 'team lead'
          // },
          // {
          //   id: 4,
          //   fname: 'Jesse',
          //   lname: 'Pinkman',
          //   email: 'science@bro.yo',
          //   username: 'jessepinkman',
          //   password: '$2a$12$PLE9QBe7YNv30Fr1QFyRze1HnKo7MVRwlgJtCpzcR/8uIJ1EqOq3u', //Jess3pinkm@n'
          //   role: 'engineer'
          // },
          // {
          //   id: 5,
          //   fname: 'Jon',
          //   lname: 'Snow',
          //   email: 'youmyqueen@king.dragon',
          //   username: 'jonsnow',
          //   password: '$2a$12$pcU504vwdlwlVzZtSPemhuovcW5PE.WbkfWuCANCJsM8ztvnSpoEy', //Jonsnow@1
          //   role: 'engineer'
          // },
          // {
          //   id: 6,
          //   fname: 'Pep',
          //   lname: 'Guardiola',
          //   email: 'uclplease@be.mine',
          //   username: 'pepguardiola',
          //   password: '$2a$12$wGKBS1XRDPwEY.lR3QQYi.5ucvkJIIqoAElQmC0XLoPr2MfsDiIhq', //Gu@rdi0la
          //   role: 'project manager'
          // },
          // {
          //   id: 7,
          //   fname: 'pablo',
          //   lname: 'escobar',
          //   email: 'heartsays@love.columbia',
          //   username: 'pabloescobar',
          //   password: '$2a$12$byAiOU4SuDUnALtIDDRu5u6ZejdH1pAL3rOb.5qMyJeRVFNQxXKAm', //P@bl0escobar
          //   role: 'team lead'
          // }
        ]);
      })
  );
};
