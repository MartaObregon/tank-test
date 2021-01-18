"use strict";

async function main(tank) {

  async function scan360andShoot(tank) {

    let angle = 0
    let dir = 0
    for (angle = 0; angle < 360; angle += 15) {
      dir = await tank.scan(angle, 10)
      // console.log(dir)
      if (dir > 0 && dir <= 700) {
        await tank.shoot(angle += 10, dir)
        await tank.shoot(angle -= 15, 700)



      }
      //prevent collision with other tank with scan
      if (dir < 100 && dir > 0 && await tank.getDamage() > 0) {
        await tank.drive(0, 50)
      }
    }

  }


  // main loop

  while (true) {

    await tank.shoot(0, 700)
    await tank.shoot(180, 700)

    // go right

    while (await tank.getX() < 800) {

      await tank.drive(0, 50)
      await scan360andShoot(tank)

    }
    //go left
    while (await tank.getX() > 400) {

      await tank.drive(180, 50)
      await scan360andShoot(tank)


    }

    // go up
    while (await tank.getY() < 600) {

      await tank.drive(90, 50);
      await scan360andShoot(tank)

    }

    // go down
    while (await tank.getY() > 300) {


      await tank.drive(270, 50);
      await scan360andShoot(tank)

    }

  }

}
