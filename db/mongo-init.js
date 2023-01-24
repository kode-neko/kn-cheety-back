db.createUser(
  {
    user: 'cheety-admin',
    pwd: 'h457Pb8m',
    roles: ['dbOwner'],
  },
);

db.createUser(
  {
    user: 'cheety-user',
    pwd: '9Dg8EC2O',
    roles: ['readWrite'],
  },
);

db.users.insertMany([
  {
    name: 'kodeneko',
    email: 'kodeneko@gmail.com',
    pass: '$2b$12$QbC/38jJ2oPMdXeXivteHOTZ0FZLSqgACfCFLggKWMT84Qs8626b2',
    salt: '$2b$12$QbC/38jJ2oPMdXeXivteHO',
  },
  {
    name: 'test',
    email: 'test@test.com',
    pass: '$2b$12$8j/JRKW/.EZmfDTi8Z1Wcu9ZTijNCWPuvwa3XhcB7t8KYPn.qgsGy',
    salt: '$2b$12$8j/JRKW/.EZmfDTi8Z1Wcu5Lr$cr14Ng94',
  },
]);

db.articles.insertMany([
  {
    title: 'docker container run -d [image_name]',
    content: [
      'Levanta un contenedor con la imagen indicada',
      'Lo hace en 2º plano. Puedes continuar en la misma terminal',
    ],
    tags: ['docker', 'container', 'run', 'detach'],
    lang: 'es',
    author: 'kodeneko',
  },
  {
    title: 'docker build -t [name] [dockerfilepath]',
    content: [
      'Crea una imagen',
      'Asocia una etiqueta',
      'Hay que indicar el lugar donde esta el dockerfile',
    ],
    tags: ['docker', 'build', 'tag'],
    lang: 'es',
    author: 'kodeneko',
  },
]);
