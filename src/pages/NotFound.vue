<script>
export default {
  name: 'NotFound',
  data() {
    return {

    }
  }

}
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <!-- Section Not-Found -->
        <div id="notfound">
          <div class="notfound">
            <div class="notfound-404">
              <h1>404</h1>
            </div>
            <h2>Oops, La pagina che stai cercando non è stata trovata!</h2>
            <a href="#"><span class="arrow"></span> Ritorna alla home</a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

body {
  background-color: #FCFAFF;
}

#notfound {
  position: relative;
  height: calc(100vh - 120px)
}

#notfound .notfound {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
}

.notfound {
  max-width: 710px;
  width: 100%;
  text-align: center;
  padding: 0px 15px;
  line-height: 1.4;
}

.notfound .notfound-404 {
  height: 200px;
  line-height: 200px;
}

.notfound .notfound-404 h1 {
  font-family: 'Fredoka One', cursive;
  font-size: 168px;
  margin: 0px;
  color: #FF385C;
  text-transform: uppercase;
}

.notfound h2 {
  font-family: 'Raleway', sans-serif;
  font-size: 22px;
  font-weight: 400;
  text-transform: uppercase;
  color: #222;
  margin: 0;
  padding-bottom: 20px;

}

.notfound a {
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  display: inline-block;
  font-weight: 700;
  border-radius: 15px;
  text-decoration: none;
  color: #39b1cb;
}

.notfound a>.arrow {
  position: relative;
  top: -2px;
  border: solid #39b1cb;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  -webkit-transform: rotate(135deg);
      -ms-transform: rotate(135deg);
          transform: rotate(135deg);
}


</style>
