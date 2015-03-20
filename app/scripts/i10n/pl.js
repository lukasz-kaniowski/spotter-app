/**
 * @author michel-habib
 */

/*exported translationsPl  */

var translationsPl = {
	// UI - Tabs
	TAB_MAP : 'Mapa',
	TAB_LIST : 'Lista',
	// Menu
	MENU_DASHBOARD : 'Dashboard',
	MENU_FIND_MISSIONS : 'Znajdz misje',
	MENU_PROFILE : 'Profil',
	MENU_HELP : 'Pomoc',
	MENU_TEST_ONLY : 'To tylko do testow',
	MENU_CONTACT : 'Contakt',
	MENU_LOGIN : 'Login',
  MENU_LOGOUT : 'Logout',
  MENU_MY_MISSIONS : 'Moje misje',
	Missions : {
		Show : {
			Title : 'Detale Misji',
			InstructionsHeader : 'Instrukcja',
			AcceptButton : 'Akceptuje',
			StartButton : 'Rozpocznij',
			TasksHeader : 'Zadania:',
			DueInTitle : 'Pozostało:',
      Cancel: "Cancel"
		},
		Activate : {
			Title : 'Akceptacja',
			AcceptButton : 'Akceptuje',
			CancelButton : 'Anuluj',
			Label : 'Czy na pewno akceptujesz to zadanie?',
			TimeToExecute : 'Masz tylko <strong>30 minut</strong> na jego wykonanie!'
		},
    Cancel : {
      Title : 'Cancel Mission',
      AcceptButton : 'OK',
      CancelButton : 'BACK',
      Label : 'Once you cancel mission you will have to book it again if you want to work on it. Are you sure you want to cancel?'
    },
		List : {
			DAYS_LEFT : 'dni',
			KMS_AWAY : 'km'
		},
    MyMissions :{
      Booked: 'To Do',
      Review: 'In Review',
      Closed: 'Completed',
      NoTasks: "You don't have any outstanding missions right now.",
      CheckMap: "Check the map for some opportunities!",
      ExpiredOn: "EXPIRED ON"
    },
    Tasks: {
      modal: {
        Title: "Mission Sent",
        Text: "Thanks for submiting mission. We are going to review it and notify you about next steps",
        Button: "Close"
      }
    }
	},
	TaskType : {
		question : 'Pytania',
		photo : 'Zdjęcia'
	}

};
