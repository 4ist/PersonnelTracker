import { Person } from './person';

export class PersonnelService {

  getAllPersonnel(): Person[] {
    return [
      new Person('Forrest', 'Richardson', 'B1'),
      new Person('Aanand', 'Shah', 'B1')
    ];
  }

}
