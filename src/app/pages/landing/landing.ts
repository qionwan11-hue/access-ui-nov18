import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonModule } from 'primeng/button';
import { TopbarWidget } from './components/topbarwidget.component';

@Component({
    selector: 'app-landing',
    standalone: true,
    imports: [RouterModule, TopbarWidget, RippleModule, StyleClassModule, ButtonModule],
    templateUrl: './landing.html'
})
export class Landing {}
