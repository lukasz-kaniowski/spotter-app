Coding Style Guide
===================

Directories
-------------

[Angular Best Practices](https://docs.google.com/document/d/1XXMvReO8-Awi1EZXAXS4PzDzdNvV6pGcuaF4Q9821Es/pub)

Http operations
----------------

### Use services
  
Http operations should be done in the `service` not in the `controller`

### Fetch data during state change

When fetching data use `resolve` in state change. i.e:
 
    resolve:  {
                mission: function ($log, $stateParams, missionsService) {
                  return missionsService.getMission($stateParams.missionId, $stateParams.locationId);
                }
              }

Controllers
----------- 

Controllers should be relatively small and delegate work to services. 

Directives
------------

Don't share the scope between controllers adn directives. Use isolated scope and pass variables as necessary. 






   
