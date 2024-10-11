import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {getTerminals} from '../../helpers/getTerminals';
import {ChannelsName} from '../../enums/channelsName.enum';

@Component({
  selector: 'ui-config-page',
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.scss'
})
export class ConfigPageComponent {
  configForm: FormGroup;
  projects = getTerminals().map(terminal => terminal.name);
  coreOption = [ChannelsName.ORCHESTRATOR, ChannelsName.HEADER, ChannelsName.CORE];
  chatOption = [...this.coreOption, ChannelsName.CHAT];
  videoOption = [...this.coreOption, ChannelsName.VIDEO, ChannelsName.BLOCK_DESIGNER];
  documentOption = [...this.coreOption, ChannelsName.DOCUMENT, ChannelsName.BLOCK_DESIGNER];

  constructor(private fb: FormBuilder) {
    this.configForm = this.fb.group({
      selectedProjects: [[]],
      addCore: [false],
      addChat: [false],
      addVideo: [false],
      addDocument: [false],
      addAll: [false]
    });
  }

  ngOnInit(): void {
    this.configForm.get('addCore')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.addProjects(this.coreOption);
      } else {
        this.removeProjects(this.coreOption);
      }
    });

    this.configForm.get('addChat')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.addProjects(this.chatOption);
      } else {
        this.removeProjects(this.chatOption);
      }
    });

    this.configForm.get('addVideo')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.addProjects(this.videoOption);
      } else {
        this.removeProjects(this.videoOption);
      }
    });

    this.configForm.get('addDocument')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.addProjects(this.documentOption);
      } else {
        this.removeProjects(this.documentOption);
      }
    });
    this.configForm.get('addAll')?.valueChanges.subscribe((checked) => {
      if (checked) {
        this.addProjects(this.projects);
      } else {
        this.removeProjects(this.projects);
      }
    });
  }

  addProjects(projectsToAdd: string[]) {
    const selected = this.configForm.get('selectedProjects')?.value || [];
    const newSelection = [...new Set([...selected, ...projectsToAdd])];  // Ensure no duplicates
    this.configForm.get('selectedProjects')?.setValue(newSelection);
  }

  removeProjects(projectsToRemove: string[]) {
    const selected = this.configForm.get('selectedProjects')?.value || [];
    const newSelection = selected.filter((project: string) => !projectsToRemove.includes(project));
    this.configForm.get('selectedProjects')?.setValue(newSelection);
  }
}
