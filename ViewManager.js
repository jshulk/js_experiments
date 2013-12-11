define([
		"backbone",
		"mainviews/BaseView"
		], function(Backbone, BaseView){
	
	var instances =  {},
		dependencyClass,
		dependency;

	return {

		onFailedLogin: function(){
			//Initialize login view , if it's not
			// render it.
			// trigger a login:ready event and pass the action
			// this.eventBus.trigger("login:ready", "failedLogin" );
		},
		onActivation: function(){

		},
		initialize: function( events ){
			this.eventBus = BaseView.prototype.eventBus;

			this.registerGlobalEventListeners( events );
		},
		registerGlobalEventListeners: function( events ){
			_.each( events, function(event){

				this.registerEvent( event );
			
			}, this);
		},
		registerEvent: function( event ){
			this.eventBus.on(event.name, event.callBack, this );
		},
		getViewInstance: function( path, multiple, params ){
			// view has not been initialized yet.
			if( !instances[path] ){
				dependency = [ path ];

				dependencyClass = this.loadDependency( dependency );

				instances[ path ] = new dependencyClass( params );
			}
			// View can have multiple instances.
			else if( instances[ path ] && multiple ){
				dependency = [ path ];
				dependencyClass = this.loadDependency( dependency );
				instances[ path ] = new dependencyClass( params );
			}

			return instances[ path ];

		},
		loadDependency: function ( dependency ) {
			var dependencyClass;
			require( dependency, function( Dependency ){
				depdencyClass = Dependency;
			});

			if( typeof dependencyClass !== "function" ){
					throw new Error( "View could not be instantiated " );

			}

			return dependencyClass;
		},
		clearView: function( path ){
			instances[ path ] = undefined;
			//viewInstance.remove();
		}


	};
});