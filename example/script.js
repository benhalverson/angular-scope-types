angular.module('app', []);

angular.controller('MainCtrl', function MainCtrl($timeout) {
  var vm = this;

  vm.goodFoo = {
    isFoo: true,
    isBar: false,
    someNum: 32
  };

  $timeout(function() {
    vm.badFoo = '';
  }, 1500);
});


angular.constant('scopeTypesDirective', angularScopeTypes().directive);

angular.directive('scopeTypedDir', function(scopeTypesDirective) {
  return scopeTypesDirective({
    template: `
      <div>
        This was scope type checked!
        <div>Passed: {{$scopeTypesResults.__passed}}</div>
        <div>Failed: {{$scopeTypesResults.__failed}}</div>
      </div>
    `,
    scope: {foo: '=', bar: '@'},
    scopeTypes: getScopeTypes
  });

  function getScopeTypes(st) {
    return {
      foo: st.shape({
        isFoo: st.bool,
        isBar: st.bool,
        someNum: st.number,
        someOptional: st.object.optional
      }).strict,
      bar: st.oneOf(['fooString', 'barString']).optional
    };
  }

});
