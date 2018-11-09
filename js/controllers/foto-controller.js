angular
  .module("alurapic")
  .controller("FotoController", function($scope, recursoFoto, $routeParams) {
    $scope.foto = {};
    $scope.mensagem = "";

    if ($routeParams.fotoId) {
      recursoFoto.get(
        { fotoId: $routeParams.fotoId },
        function(foto) {
          $scope.foto = foto;
        },
        function(erro) {
          console.log(erro);
          $scope.mensagem = "Não foi possível obter a foto";
        }
      );
    }

    $scope.submeter = function() {
      if ($scope.formulario.$valid) {
        if ($routeParams.fotoId) {
          recursoFoto.update(
            { fotoId: $scope.foto._id },
            $scope.foto,
            function() {
              $scope.mensagem = "Foto " + $scope.foto.titulo + " foi alterada";
            },
            function(erro) {
              $scope.mensagem =
                "Não foi possível alterar a foto " + $scope.foto.titulo;
            }
          );
        } else {
          $http
            .post("/v1/fotos", $scope.foto)
            .success(function() {
              $scope.foto = {};
              $scope.mensagem = "Foto cadastrada com sucesso";
            })
            .error(function(erro) {
              console.log(erro);
              $scope.mensagem = "Não foi possível cadastrar a foto";
            });
        }
      }
    };
  });
