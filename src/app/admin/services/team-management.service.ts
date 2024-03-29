import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Team } from '../classes/team';

const ALL_SKILLS = [
	{ name: 'Java', displayName: 'Java' },
	{ name: 'Angular', displayName: 'Angular' },
	{ name: 'Dot Net', displayName: 'Dot Net' }
];

@Injectable({
	providedIn: 'root'
})
export class TeamManagementService {
	getSkills() {
		return of(ALL_SKILLS);
	}
	saveTeam(team: Team) {
		console.log('------------TEAM------------');
		console.log('Team Name: ' + team.teamName);
		console.log('----- Employee Details -----');
		for (let emp of team.employees) {
			console.log('Emp Name: ' + emp.empName);
			console.log('Emp age: ' + emp.age);
			console.log('Emp Skill: ' + emp.skill);
			console.log('-------------------');
		}
	}
} 