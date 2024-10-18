import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { getTerminals } from '../../helpers/getTerminals';
import { ChannelsName } from '../../enums/channelsName.enum';
import { ActiveTerminalsService } from '../../signals/activeTerminals.service';

@Component({
  selector: 'ui-config-page',
  templateUrl: './config-page.component.html',
  styleUrl: './config-page.component.scss'
})
export class ConfigPageComponent {
  configForm: FormGroup;
  projectsPool = getTerminals().map(terminal => terminal.name);
  coreOption = [ChannelsName.ORCHESTRATOR, ChannelsName.HEADER, ChannelsName.CORE];
  chatOption = [...this.coreOption, ChannelsName.CHAT];
  videoOption = [...this.coreOption, ChannelsName.VIDEO, ChannelsName.BLOCK_DESIGNER];
  documentOption = [...this.coreOption, ChannelsName.DOCUMENT, ChannelsName.BLOCK_DESIGNER];

  //services
  activeTerminals = inject(ActiveTerminalsService);

  constructor(private fb: FormBuilder) {
    const selectedProjects = this.activeTerminals.activeTerminals().map(terminal => terminal.name);

    // Initialize the form with selectedProjects and checkbox states
    this.configForm = this.fb.group({
      selectedProjects: [selectedProjects],
      addCore: [false],
      addChat: [false],
      addVideo: [false],
      addDocument: [false],
      addAll: [false]
    });
  }

  ngOnInit(): void {
    // Update checkboxes based on selectedProjects when the component loads
    this.updateCheckboxes();

    // Subscribe to value changes of checkboxes
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
        this.addProjects(this.projectsPool);
      } else {
        this.removeProjects(this.projectsPool);
      }
    });

    // Subscribe to selectedProjects changes to update checkboxes
    this.configForm.get('selectedProjects')?.valueChanges.subscribe(() => {
      this.updateCheckboxes();
    });
  }

  addProjects(projectsToAdd: string[]) {
    const selected = this.configForm.get('selectedProjects')?.value || [];
    const newSelection = [...new Set([...selected, ...projectsToAdd])];  // Ensure no duplicates
    this.configForm.get('selectedProjects')?.setValue(newSelection);
    this.activeTerminals.setTerminals(newSelection);
  }

  removeProjects(projectsToRemove: string[]) {
    const selected = this.configForm.get('selectedProjects')?.value || [];
    const newSelection = selected.filter((project: string) => !projectsToRemove.includes(project));
    this.configForm.get('selectedProjects')?.setValue(newSelection);
    this.activeTerminals.setTerminals(newSelection);
  }

  updateCheckboxes() {
    const selected = this.configForm.get('selectedProjects')?.value || [];

    const containsAll = (arr: string[]) => arr.every(v => selected.includes(v));

    // Update checkboxes without emitting events to avoid infinite loops
    this.configForm.get('addCore')?.setValue(containsAll(this.coreOption), { emitEvent: false });
    this.configForm.get('addChat')?.setValue(containsAll(this.chatOption), { emitEvent: false });
    this.configForm.get('addVideo')?.setValue(containsAll(this.videoOption), { emitEvent: false });
    this.configForm.get('addDocument')?.setValue(containsAll(this.documentOption), { emitEvent: false });
    this.configForm.get('addAll')?.setValue(containsAll(this.projectsPool), { emitEvent: false });
  }
}
