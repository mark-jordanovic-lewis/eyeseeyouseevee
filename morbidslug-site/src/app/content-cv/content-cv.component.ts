import { Component, OnInit } from '@angular/core';
import { Content } from '../content';

@Component({
  selector: 'content-cv',
  templateUrl: './content-cv.component.html',
  styleUrls: ['./content-cv.component.scss']
})
export class ContentCvComponent implements OnInit {

  content: Content;

  constructor() {}

  ngOnInit() {
    this.content = new Content()
    this.content.cssClass = "personal-story";
    this.content.h2 = "<h2>Personal Story</h2>";
    this.content.html = "\
        <p>Lorem ipsum dolor sit amet, his id voluptua accusata iudicabit, ne possim scripta oporteat eum, impedit tractatos euripidis ei eum. Pro cu illud veniam. Est audiam eruditi nostrum ei. Putent aliquam est ad, id vix mucius commune, munere antiopam eos an.</p> \
        <p>Cu est alia idque. Duo quem summo dicunt ut, tempor platonem pericula eos et. Sit clita putant delicata cu, pri perfecto sadipscing philosophia in. Sit ut quaeque recusabo. Ut his recusabo delicatissimi, tale albucius eos eu.</p> \
        <p>Vix alii gloriatur no, sumo democritum no has, mei ferri docendi an. Elitr persecuti assueverit sea te, ea nec sumo ullum deleniti. Eos maiorum postulant ne. Scripta vituperata deterruisset duo et, his ei augue laudem. Cu prima efficiantur nec, possit tritani assueverit sit ne, mea brute nonumes in.</p> \
        <p>Ea veritus phaedrum voluptatibus sed. Doming quidam complectitur ea pro, quando consul no quo. An ius vidisse persius singulis, eu vim primis fuisset. Mel primis delenit no, habeo probatus atomorum quo et, latine ornatus ne duo.</p> \
        <p>Utamur graecis vim id, qui ad dicta debet postea, ius ad sanctus vituperata. Illud aliquid perpetua et duo, vel prima propriae in. Autem tibique ex pri, te vis audiam expetendis. Eius dignissim delicatissimi duo at. Tractatos dignissim similique ne duo, ut viris reprehendunt definitionem mea. Est ex stet inimicus expetenda.</p>\
      ";
  }

}
